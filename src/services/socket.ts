import io, { Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | undefined;

  connect(url: string): void {
    const link = process.env.NODE_ENV === 'test' ? '' : url;
    this.socket = io(link);

    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    this.socket.on('connect_timeout', () => {
      console.error('Connection timeout');
    });
  }

  emit(event: string, data?: any): void {
    if (!this.socket) {
      console.error('Socket is not initialized. Call connect() first.');
      return;
    }

    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void): void {
    if (!this.socket) {
      return;
    }

    this.socket.on(event, callback);
  }

  disconnect(): void {
    if (!this.socket) {
      console.log('Socket is not initialized. Call connect() first.');
      return;
    }

    this.socket.disconnect();
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export default new SocketService();
