package com.itda.backend.location;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itda.backend.mapper.LocationMapper;
import com.itda.backend.users.Users;
import com.itda.backend.users.UsersDTO;
import com.itda.backend.users.UsersRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private LocationMapper locationMapper;

    @Autowired
    private UsersRepository usersRepository;

    // 위치를 받아오면 보정해서 저장하는 서비스
    @Transactional
    public Location save(Users users, Location location) {

        Long userNo = users.getUserNo();

        Double ADJUSTED_LNG = location.getLng();
        Double ADJUSTED_LAT = location.getLat();

        Random random = new Random();

        // 실제 좌표에서 0.0~500.0m 얼마나 떨어트릴지 랜덤으로 정하고
        int randomNumber = random.nextInt(499);

        // randomNumber = x^2 + y^2

        // 떨어진 좌표에서 x y 값을 x 기준으로 정함
        double x = random.nextInt(randomNumber);
        double y = Math.sqrt((randomNumber * randomNumber) - (x * x));

        // x y 는 제곱근 이므로 부호 랜덤으로 정함
        int sign = random.nextInt(3);

        if (sign == 0) {
        } else if (sign == 1) {
            y = (y * (-1));
        } else if (sign == 2) {
            x = (x * (-1));
        } else {
            x = (x * (-1));
            y = (y * (-1));
        }

        // 보정치 적용
        // 경도 1m = 0.0000111~0.0000113
        // 위도 1m = 0.0000084~0.0000091
        ADJUSTED_LNG = ADJUSTED_LNG + (x * 0.0000113);
        ADJUSTED_LAT = ADJUSTED_LAT + (y * 0.0000091);

        location.setAdjustedLat(ADJUSTED_LAT);
        location.setAdjustedLng(ADJUSTED_LNG);
        location.setUserNo(userNo);;

        String addressInputString = location.getAddress();
        String[] splitted = addressInputString.split(" ");
        StringBuilder resultBuilder = new StringBuilder();

        // 첫 번째 배열은 그대로 더하기
        resultBuilder.append(splitted[1]);

        // 두 번째 배열부터 마지막에서 두 번째 배열까지 공백으로 붙이기
        for (int i = 2; i < splitted.length - 1; i++) {
            resultBuilder.append(" ").append(splitted[i]);
        }

        String mergedString = resultBuilder.toString();


        UsersDTO usersDTO = new UsersDTO();

        usersDTO.setUserAddress(mergedString);
        usersDTO.setUserNo(userNo);

        // System.out.println("테스트1");
        // System.out.println(addressInputString);
        // System.out.println(mergedString);
        // System.out.println(usersDTO.getUserNo());

        try {
            locationMapper.addressInput(usersDTO);
        } catch (Exception e) {
            // 예외 처리 코드 작성
            e.printStackTrace();
        }

        return locationRepository.save(location);
    }

    @Transactional(readOnly = true)
    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    // userNo를 받아와서 가까운 순으로 조회
    public List<LocationDTO> getMatchingDistance(Long userNo) throws Exception {

        List<LocationDTO> matchingDistances = locationMapper.getMatchingDistance(userNo);

        if (matchingDistances.size() < 4) {
            return null;
        }

        Optional<Users> OptionalUser = usersRepository.findByUserNo(userNo);

        if (OptionalUser.isPresent()) {
            Users userInfo = OptionalUser.get();
            int diaQty = userInfo.getDiaQty();

            // users 객체의 dia가 부족하면 돌려보냄
            if (diaQty < 30) {
                throw new IllegalArgumentException("다이아 개수가 부족합니다.");
            }

            // Users 다이아 차감 메소드 실행
            userInfo.decreaseDiaQty(30);
            usersRepository.save(userInfo);

        } else { // userNo에 해당하는 유저 정보 없을 때 예외
            throw new IllegalArgumentException("유저 정보가 없습니다.");
        }

        List<LocationDTO> locations = locationMapper.getMatchingDistance(userNo);

        return matchingDistances.size() >= 4 ? locations.subList(0, Math.min(locations.size(), 4)) : null;
    }

    public void selected(LocationSelectedDTO dto) throws Exception {

        LocationSelectedDTO locationSelectedDTO = new LocationSelectedDTO();
        locationSelectedDTO.setUserNo(dto.getUserNo());

        List<LocationDTO> matchingDistances = locationMapper.getMatchingDistance(dto.getUserNo());

        // 모든 matchingDistances에서 userNo를 추출하여 selectedNo로 사용
        List<Long> selectedNos = new ArrayList<>();
        for (LocationDTO locationDTO : matchingDistances.subList(0, Math.min(matchingDistances.size(), 4))) {
            selectedNos.add(locationDTO.getUserNo());
        }

        // 각 selectedNo를 사용하여 locationMapper를 호출
        int count = 0;
        for (Long selectedNo : selectedNos) {

            locationSelectedDTO.setSelected(selectedNo);

            locationMapper.selected(locationSelectedDTO);

            count++;
            if (count >= 4) {
                break;
            }
        }

    }

    public void addressInput(UsersDTO dto) throws Exception{
        locationMapper.addressInput(dto);
    }

}
