import {StompService} from 'ng2-stomp-service';
import {ActivatedRoute} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class ChatService {
  private username: string;

  constructor(private _stompService: StompService, private route: ActivatedRoute) {
    _stompService.configure({
      host: '/ws',
      debug: true,
      queue: {'init': false}
    });
  }

  public connect(username: string, callback) {
    this.startConnect(username, callback);
  }

  public startConnect(username: string, onReceived) {
    this._stompService.startConnect().then(() => {
      this._stompService.done('init');
      console.log('connected');
      this.username = username;

      var chatMessage = {
        'sender': this.username,
        'type': 'JOIN'
      };

      console.log(chatMessage);
      this._stompService.send('/app/addUser', chatMessage);

      this._stompService.subscribe('/channel/public', (data) => {
        onReceived(data);
      })

      this._stompService.subscribe('/valid/errors', (error) => {
        this.onError(error);
      });

    });
  }

  public onSendMessage(input: string) {
    var messageContent = input.trim();
    if (messageContent) {
      var chatMessage = {
        'sender': this.username,
        'content': input,
        'type': 'CHAT'
      };
      console.log(chatMessage);
      this._stompService.send("/app/sendMessage", chatMessage);
    }
  }

  private onError = (error) => {
    alert('Could not connect to WebSocket server. Please refresh this page to try again!');
    alert(error.message);
  }

}

