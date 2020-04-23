package com.map.desire.web;


import com.map.desire.domain.Map;
import com.map.desire.services.MapValidationErrorService;
import com.map.desire.services.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/map")
@CrossOrigin
public class MapController {

    @Autowired
    private MapService mapService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("")
    public ResponseEntity<?> createNewMap(@Valid @RequestBody Map map, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Map map1 = mapService.saveOrUpdateMap(map, principal.getName());
        return new ResponseEntity<Map>(map1, HttpStatus.CREATED);
    }


    @GetMapping("/{mapId}")
    public ResponseEntity<?> getMapById(@PathVariable String mapId, Principal principal){

        Map map = mapService.findMapByIdentifier(mapId, principal.getName());

        return new ResponseEntity<Map>(map, HttpStatus.OK);
    }


    @GetMapping("/all")
    public Iterable<Map> getAllMaps(Principal principal){return mapService.findAllMaps(principal.getName());}


    @DeleteMapping("/{mapId}")
    public ResponseEntity<?> deleteMap(@PathVariable String mapId, Principal principal){
        mapService.deleteMapByIdentifier(mapId, principal.getName());

        return new ResponseEntity<String>("Map with ID: '"+mapId+"' was deleted", HttpStatus.OK);
    }
}
