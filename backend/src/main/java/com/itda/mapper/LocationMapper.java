package com.itda.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.itda.dto.LocationDTO;
import com.itda.dto.LocationSelectedDTO;

@Mapper
public interface LocationMapper {
    
    // public int maxNum() throws Exception;
	
	// public void insertData(LocationDTO dto) throws Exception;
	
	// public int getDataCount(String searchKey, String searchValue) throws Exception;
	
	// public List<LocationDTO> getList(int start, int end, String searchKey, String searchValue) throws Exception;
	
	// public LocationDTO getReadData(int num) throws Exception;
	
	// public void updateHitCount(int num) throws Exception;
	
	// public void updateData(LocationDTO dto) throws Exception;
	
	// public void deleteData(int num) throws Exception;

	// public List<LocationDTO> getInfo(List<LocationSelectedDTO> userNo) throws Exception;

	public List<LocationDTO> getMatchingDistance(Long userNo) throws Exception;

	public List<LocationDTO> getMatchingDistanceNumber(Long userNo) throws Exception;

	public void selected(LocationSelectedDTO dto) throws Exception;

	public LocationSelectedDTO getMatchingData(Long num) throws Exception;

}
