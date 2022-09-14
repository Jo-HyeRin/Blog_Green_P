package site.metacoding.red.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.metacoding.red.domain.boards.Boards;
import site.metacoding.red.domain.boards.BoardsDao;
import site.metacoding.red.domain.users.Users;
import site.metacoding.red.domain.users.UsersDao;
import site.metacoding.red.web.dto.request.boards.UpdateDto;
import site.metacoding.red.web.dto.request.boards.WriteDto;
import site.metacoding.red.web.dto.response.boards.MainDto;
import site.metacoding.red.web.dto.response.boards.PagingDto;

@RequiredArgsConstructor
@Service
public class BoardsService {
	
	private final BoardsDao boardsDao;
	private final UsersDao usersDao;
	
	public PagingDto 게시글목록보기(Integer page, String keyword) {
		if(page==null) {page=0;}
		
		int startNum = page*3;
		List<MainDto> boardsList = boardsDao.findAll(startNum, keyword);
		PagingDto pagingDto = boardsDao.paging(page, keyword);
		
		if (boardsList.size() == 0)
			pagingDto.setNotResult(true);
			pagingDto.makeBlockInfo(keyword);
			pagingDto.setMainDtos(boardsList);

		return pagingDto;
		
	} // 검색하기합쳐버령 Integer page, String keyword 받기
	
	public Boards 게시글상세보기(Integer id) {
		return boardsDao.findById(id);
	}
	
	public void 게시글수정하기(Integer id, UpdateDto updateDto) {
		// 영속화
		Boards boardsPS = boardsDao.findById(id);
		if(boardsPS==null) {
			
		}
		
		// 변경
		boardsPS.update(updateDto);
		// 수행
		boardsDao.update(boardsPS);
	}
	
	public void 게시글삭제하기(Integer id) {
		Boards boardsPS = boardsDao.findById(id);
		if (boardsPS == null ){
			
		}
		
		boardsDao.deleteById(id);
	}
	
	public void 게시글쓰기(WriteDto writeDto, Users principal) {
		boardsDao.insert(writeDto.toEntity(principal.getId()));
	}
	
}
