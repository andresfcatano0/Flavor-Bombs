package org.learn.bombs.domain;

import java.util.ArrayList;
import java.util.List;

public class Result<T> {

    T payload;
    List<String> errorMessages = new ArrayList<>();

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public void addErrorMessage( String errorMessage ){
        errorMessages.add(errorMessage);
    }

    public List<String> getErrorMessages(){
<<<<<<< HEAD
        //return a copy so the outside world can't mutate errors after
        //they've been added
=======
>>>>>>> 46d0b244511803571cd63bb8605736042d361ca4
        return new ArrayList<>(errorMessages);
    }
    public boolean isSuccess(){
        return errorMessages.isEmpty();
    }
<<<<<<< HEAD

=======
>>>>>>> 46d0b244511803571cd63bb8605736042d361ca4
}
