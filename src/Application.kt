package com.example

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.websocket.*
import io.ktor.http.cio.websocket.*
import java.time.*
import com.fasterxml.jackson.databind.*
import io.ktor.jackson.*
import io.ktor.features.*
import java.util.*
import java.util.concurrent.atomic.AtomicInteger
import kotlin.collections.LinkedHashSet

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(io.ktor.websocket.WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }

    install(ContentNegotiation) {
        jackson {
            enable(SerializationFeature.INDENT_OUTPUT)
        }
    }

    routing {
        get("/") {
            call.respondText("HELLO WORLD!", contentType = ContentType.Text.Plain)
        }

        val clients = Collections.synchronizedSet(LinkedHashSet<ChatClient>())

        webSocket("/chat") { // this: DefaultWebSocketSession
            val client = ChatClient(this)
            clients += client
            try {
                while (true) {
                    when (val frame = incoming.receive()) {
                        is Frame.Text -> {
                            val text = frame.readText()
                            // Iterate over all the connections
                            val textToSend = "${client.name} said: $text"
                            for (other in clients.toList()) {
                                if(other != client) {
                                    other.session.outgoing.send(Frame.Text(textToSend))
                                }
                            }

                            if(text.equals("end",ignoreCase = true)){
                                close(CloseReason(CloseReason.Codes.NORMAL,"Client exited"))
                            }
                        }
                    }
                }
            } finally {
                clients -= client
            }
        }

        get("/json/jackson") {
            call.respond(StolenResponse("aa"))
        }
    }
}


data class StolenResponse(val aba:String)


class ChatClient(val session: DefaultWebSocketSession) {
    companion object { var lastId = AtomicInteger(0) }
    val id = lastId.getAndIncrement()
    val name = "user$id"
}