package com.itda.item;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itda.dto.ItemDTO;
import com.itda.mapper.ItemMapper;
import com.itda.users.Users;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemService{

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemMapper itemMapper;

    //아이템 사용
    @Transactional
    public void use(ItemDTO dto) throws Exception{
        itemMapper.use(dto);
    }

    //아이템 충전
    @Transactional
    public void charge(ItemDTO dto) throws Exception{
        itemMapper.charge(dto);
    }

    //아이템 갯수 조회
    @Transactional
    public ItemDTO getReadData(Long userNo) throws Exception{
        return itemMapper.getReadData(userNo);
    }

    @Transactional
    public Item save(Users users){

        Item item = new Item();

        item.setUserNo(users.getUserNo());

        return itemRepository.save(item);
    }

}
