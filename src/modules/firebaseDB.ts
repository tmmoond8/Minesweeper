import * as firebase from 'firebase';
import { Rank } from '../types';

const firebaseConfig = {
  apiKey: 'AIzaSyDzDfG6AOiqLleOO_8ikVKXz-75QQ7kSlw',
  authDomain: 'minesweeper-26527.firebaseapp.com',
  databaseURL: 'https://minesweeper-26527.firebaseio.com',
  projectId: 'minesweeper-26527',
  storageBucket: 'minesweeper-26527.appspot.com',
  messagingSenderId: '312617499290',
  appId: '1:312617499290:web:c3a10029f2acc4003ebd23',
  measurementId: 'G-L9EXBG0WQC',
};
firebase.initializeApp(firebaseConfig);

class Firebase {
  private firebase: firebase.database.Database;
  constructor() {
    this.firebase = firebase.database();
  }
  async getList(): Promise<Rank[]> {
    const data: Rank[] = await new Promise((resolve, reject) => {
      this.firebase.ref('/rank').on('value', function (data) {
        const rankObj = data.toJSON() ?? {};
        resolve(Object.values(rankObj) as Rank[]);
      });
    });
    return data;
  }
  async addScore(nickname: string, score: number): Promise<void> {
    await this.firebase.ref('/rank').push({ nickname, score });
  }
}
export default new Firebase();
