package com.example.Backenddemo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Data
@Document(collection = "usuarios")
@AllArgsConstructor
@NoArgsConstructor 
public class Usuario {

    @Id
    private String id;

    private int doc;

    private String name;

    public int getDocument() {
        return doc;
    }

    public void setDocument(int document) {
        this.doc = document;
    }
}
