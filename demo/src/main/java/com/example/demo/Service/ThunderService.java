package com.example.demo.Service;


import com.example.demo.Mapper.ThunderMapper;
import com.example.demo.VO.Thunder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThunderService {
        @Autowired
        private ThunderMapper thunderMapper;

//        public List<Thunder> searchStore(String searchData){
//        return thunderMapper.searchStore(searchData);
//        }
        public List<Thunder> getByLocation(String location) {
            return thunderMapper.getByLocation(location);
        }
        public List<Thunder> getByCategory(String category) {
        return thunderMapper.getByCategory(category);
}
        public List<Thunder> getByUsername(String username){return thunderMapper.getByUsername(username);}

        public List<Thunder> getByAll(String category, String location, String username){
            return thunderMapper.getByAll(category, location, username);}
        public List<Thunder> getAll() {
            return thunderMapper.getAll();
        }

        public Thunder getId(int id) {
            return thunderMapper.getById(id);
        }

        public int insert(Thunder thunder) {
            return  thunderMapper.insertThunder(thunder);
        }

        public int delete(int id) {
            return thunderMapper.deleteThunder(id);
        }

//        public int update(int id,Thunder thunder) {
//            return thunderMapper.updateThunder(id,thunder);
//        }
}
