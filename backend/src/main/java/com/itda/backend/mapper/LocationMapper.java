package com.itda.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.itda.backend.location.LocationDTO;
import com.itda.backend.location.LocationSelectedDTO;
import com.itda.backend.users.UsersDTO;

@Mapper
public interface LocationMapper {

	public List<LocationDTO> getMatchingDistance(Long userNo) throws Exception;

	public List<LocationDTO> getMatchingDistanceNumber(Long userNo) throws Exception;

	public void selected(LocationSelectedDTO dto) throws Exception;

	public LocationSelectedDTO getMatchingData(Long num) throws Exception;

	public void addressInput(UsersDTO dto) throws Exception;
}
