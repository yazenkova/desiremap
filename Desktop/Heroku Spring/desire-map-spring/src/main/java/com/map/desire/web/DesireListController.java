package com.map.desire.web;

import com.map.desire.domain.Desire;
import com.map.desire.services.MapValidationErrorService;
import com.map.desire.services.DesireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/desireList")
@CrossOrigin
public class DesireListController {

    @Autowired
    private DesireService desireService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("/{desireList_id}")
    public ResponseEntity<?> addDesire(@Valid @RequestBody Desire desire,
                                            BindingResult result, @PathVariable String desireList_id, Principal principal){
        //show delete
        //custom exception

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Desire desire1 = desireService.addDesire(desireList_id, desire, principal.getName());

        return new ResponseEntity<Desire>(desire1, HttpStatus.CREATED);

    }

    @GetMapping("/{desireList_id}")
    public Iterable<Desire> getMapDesireList(@PathVariable String desireList_id, Principal principal){

        return desireService.findDesireListById(desireList_id, principal.getName());

    }

    @GetMapping("/{desireList_id}/{desire_id}")
    public ResponseEntity<?> getDesire(@PathVariable String desireList_id, @PathVariable String desire_id, Principal principal){
        Desire desire = desireService.findDesireByDesireSequence(desireList_id, desire_id, principal.getName());
        return new ResponseEntity<Desire>( desire, HttpStatus.OK);
    }


    @PatchMapping("/{desireList_id}/{desire_id}")
    public ResponseEntity<?> updateDesire(@Valid @RequestBody Desire desire, BindingResult result,
                                            @PathVariable String desireList_id, @PathVariable String desire_id, Principal principal ){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Desire updatedStep = desireService.updateByDesireSequence(desire,desireList_id,desire_id, principal.getName());

        return new ResponseEntity<Desire>(updatedStep,HttpStatus.OK);

    }


    @DeleteMapping("/{desireList_id}/{desire_id}")
    public ResponseEntity<?> deleteDesire(@PathVariable String desireList_id, @PathVariable String desire_id, Principal principal){
        desireService.deleteDesireByDesireSequence(desireList_id, desire_id, principal.getName());

        return new ResponseEntity<String>("Map Step "+desire_id+" was deleted successfully", HttpStatus.OK);
    }


}
