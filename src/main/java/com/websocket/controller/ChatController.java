package com.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import com.websocket.model.ChatMessage;
import com.websocket.model.MessageError;

@Controller
public class ChatController {

	@MessageMapping("/sendMessage")
	@SendTo("/channel/public")
	public ChatMessage sendMessage(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessore)
			throws Exception {
		return chatMessage;
	}

	@MessageMapping("/addUser")
	@SendTo("/channel/public")
	public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor)
			throws InterruptedException {
		Thread.sleep(500);
		headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
		return chatMessage;
	}

	@MessageExceptionHandler
	@SendToUser("/valid/errors") // send to only the sender
	public MessageError handleException(Throwable exception) {
		MessageError error = new MessageError();
		error.setMessage(exception.getMessage());
		return error;
	}

}
