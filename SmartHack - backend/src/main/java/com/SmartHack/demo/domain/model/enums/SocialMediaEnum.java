package com.SmartHack.demo.domain.model.enums;


import lombok.Getter;

@Getter
public enum SocialMediaEnum {


    FACEBOOK("https://www.facebook.com/","Facebook"),
    INSTAGRAM("https://www.instagram.com/" , "Instagram"),
    TWITTER("https://www.twitter.com/", "Twitter"),
    TIKTOK("https://www.tik-tok.com/" , "Tik-Tok");

    private String link;
    private String nameDisplay;

    SocialMediaEnum(String link , String nameDisplay) {
        this.link =link;
        this.nameDisplay = nameDisplay;
    }
}
