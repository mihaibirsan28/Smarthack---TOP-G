package com.SmartHack.demo.infra.jpa.mapper.converter;


import com.SmartHack.demo.domain.model.Coordinates;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CordinatesConvertorUtil {

    @CordinatesToString
    private static String coridinatesToString(Set<Coordinates> coordinates){
        String result = "";
        coordinates.forEach(coordinate -> {
            result.concat("{" +coordinate.getXCoord() + ","+ coordinate.getYCoord()+","+coordinate.getZCoord()+"} ");
        });
        return result;
    }

    @StringToCordinates
    private static Set<Coordinates> coridinatesToString(String coordinates){
        Set<Coordinates> result = new HashSet<>();
        List<String> list = Arrays.stream(coordinates.split(" ")).toList();
        for(String x : list){
            x.replace("{","");
            x.replace("}","");
            String[] val = x.split(",");
            result.add(Coordinates.builder()
                    .xCoord(Double.parseDouble(val[0]))
                    .yCoord(Double.parseDouble(val[1]))
                    .zCoord(Double.parseDouble(val[2]))
                    .build());
        }
        return result;
    }

}
