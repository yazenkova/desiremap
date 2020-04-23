package com.map.desire.services;

import com.map.desire.domain.Map;
import com.map.desire.domain.DesireList;
import com.map.desire.domain.User;
import com.map.desire.exceptions.MapIdException;
import com.map.desire.exceptions.MapNotFoundException;
import com.map.desire.repositories.DesireListRepository;
import com.map.desire.repositories.MapRepository;
import com.map.desire.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapService {

    @Autowired
    private MapRepository mapRepository;

    @Autowired
    private DesireListRepository mapListRepository;

    @Autowired
    private UserRepository userRepository;

    public Map saveOrUpdateMap(Map map, String username){

        if(map.getId() != null){
            Map existingMap = mapRepository.findByMapIdentifier(map.getMapIdentifier());
            if(existingMap !=null &&(!existingMap.getMapOwner().equals(username))){
                throw new MapNotFoundException("Map not found in your account");
            }else if(existingMap == null){
                throw new MapNotFoundException("Map with ID: '"+map.getMapIdentifier()+"' cannot be updated because it doesn't exist");
            }
        }

        try{

            User user = userRepository.findByUsername(username);
            map.setUser(user);
            map.setMapOwner(user.getUsername());
            map.setMapIdentifier(map.getMapIdentifier().toUpperCase());

            if(map.getId()==null){
                DesireList desireList = new DesireList();
                map.setDesireList(desireList);
                desireList.setMap(map);
                desireList.setMapIdentifier(map.getMapIdentifier().toUpperCase());
            }

            if(map.getId()!=null){
                map.setDesireList(mapListRepository.findByMapIdentifier(map.getMapIdentifier().toUpperCase()));
            }

            return mapRepository.save(map);

        }catch (Exception e){
            throw new MapIdException("Map ID '"+map.getMapIdentifier().toUpperCase()+"' already exists");
        }

    }


    public Map findMapByIdentifier(String mapId, String username){

        //Only want to return the map if the user looking for it is the owner

        Map map = mapRepository.findByMapIdentifier(mapId.toUpperCase());

        if(map == null){
            throw new MapIdException("Map ID '"+mapId+"' does not exist");
        }

        if(!map.getMapOwner().equals(username)){
            throw new MapNotFoundException("Map not found in your account");
        }

        return map;
    }

    public Iterable<Map> findAllMaps(String username){
        return mapRepository.findAllByMapOwner(username);
    }


    public void deleteMapByIdentifier(String mapid, String username){


        mapRepository.delete(findMapByIdentifier(mapid, username));
    }

}
