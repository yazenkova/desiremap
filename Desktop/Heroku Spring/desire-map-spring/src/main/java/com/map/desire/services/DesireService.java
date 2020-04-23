package com.map.desire.services;

import com.map.desire.domain.DesireList;
import com.map.desire.domain.Desire;
import com.map.desire.exceptions.MapNotFoundException;
import com.map.desire.repositories.DesireListRepository;
import com.map.desire.repositories.MapRepository;
import com.map.desire.repositories.DesireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DesireService {


    @Autowired
    private DesireListRepository mapListRepository;

    @Autowired
    private DesireRepository desireRepository;

    @Autowired
    private MapRepository mapRepository;

    @Autowired
    private MapService mapService;


    public Desire addDesire(String mapIdentifier, Desire desire, String username){

        DesireList desireList =  mapService.findMapByIdentifier(mapIdentifier, username).getDesireList();
        //System.out.println(desireList);
        desire.setDesireList(desireList);
        Integer ListSequence = desireList.getDesiresNumber();
        ListSequence++;

        desireList.setDesiresNumber(ListSequence);

        desire.setDesireSequence(desireList.getMapIdentifier()+"-"+ListSequence);
        desire.setMapIdentifier(mapIdentifier);

        return desireRepository.save(desire);
    }

    public Iterable<Desire> findDesireListById(String id, String username){

        mapService.findMapByIdentifier(id, username);

        return desireRepository.findByMapIdentifierOrderByTag(id);
    }


    public Desire findDesireByDesireSequence(String desireList_id, String desire_id, String username){

        //make sure we are searching on an existing mapList
        mapService.findMapByIdentifier(desireList_id, username);
        //make sure that our step exists
        Desire desire = desireRepository.findByDesireSequence(desire_id);

        if(desire == null){
            throw new MapNotFoundException("Map Step '"+desire_id+"' not found");
        }

        //make sure that the mapList/map id in the path corresponds to the right map
        if(!desire.getMapIdentifier().equals(desireList_id)){
            throw new MapNotFoundException("Map Step '"+desire_id+"' does not exist in map: '"+desireList_id);
        }


        return desire;
    }

    public Desire updateByDesireSequence(Desire updatedStep, String mapList_id, String desire_id, String username){
        Desire desire = findDesireByDesireSequence(mapList_id, desire_id, username);

        desire = updatedStep;

        return desireRepository.save(desire);
    }


    public void deleteDesireByDesireSequence(String mapList_id, String desire_id, String username){
        Desire desire = findDesireByDesireSequence(mapList_id, desire_id, username);
        desireRepository.delete(desire);
    }

}
