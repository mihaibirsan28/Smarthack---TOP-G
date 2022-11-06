package com.SmartHack.demo.exposition.resources;

import com.SmartHack.demo.domain.model.Store;
import com.SmartHack.demo.exposition.ICommand.ICommand;
import com.SmartHack.demo.exposition.IQuerry.IQuerry;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/store", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j

public class StoreResource {

    @Autowired
    private ICommand<Store> storeICommand;

    @Autowired
    private IQuerry<Store> storeIQuerry;

    @PostMapping("")
    public ResponseEntity<Store> createStore(@RequestBody Store store) throws URISyntaxException {

        String id = storeICommand.save(store);

        final var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/" + id).toUriString();

        return ResponseEntity.created(new URI(uri))
                .body(storeIQuerry.getById(id));
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Store> updateStore(@PathVariable("id") String id, @RequestBody Store store){

        String objectId = storeICommand.update(store, id);

        return ResponseEntity.ok()
                .body(storeIQuerry.getById(objectId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Store> getStoreById(@PathVariable("id") String id){
        return ResponseEntity.ok()
                .body(storeIQuerry.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable("id") String id){

        storeICommand.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<Store>> getAllStores(){
        return ResponseEntity.ok()
                .body(storeIQuerry.getAll());
    }

}
