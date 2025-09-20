package com.devops.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoggingController {
    private static final Logger logger = LoggerFactory.getLogger(LoggingController.class);

    @GetMapping("/test")
    public String test() {
        logger.info("INFO: Accessed /test endpoint");
        logger.debug("DEBUG: Debugging /test endpoint");
        logger.error("ERROR: Something went wrong");
        return "Logging test";
    }
}
