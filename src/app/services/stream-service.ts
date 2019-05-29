import { Observable } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

export class StreamService {
  streamBlocks(url:string): Observable<any>{
    const bitcoinSocket = webSocket(url);
    
    return bitcoinSocket.multiplex(
                 () => ({'op':'blocks_sub'}),
                 () => ({'op':'blocks_unsub'}),
                 message => {
                     return true;
                 }
             );
  }

  streamTransactions(url:string): Observable<any>{
    const bitcoinSocket = webSocket(url);
   
    return bitcoinSocket.multiplex(
                () => ({'op':'unconfirmed_sub'}),
                () => ({'op':'unconfirmed_unsub'}),
                message => {
                    return true;
                }
            );
   }
}