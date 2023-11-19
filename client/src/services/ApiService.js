import axios from 'axios';

const BASEURL = 'http://localhost:8000';

export default class ApiService {

  static async getGameState(input) {
    try {
      const response = await axios.post(`${BASEURL}/getGameState`, input);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async playRound(input) {
    try {
      const response = await axios.post(`${BASEURL}/playRound`, input);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async resetGame() {
    try {
      const response = await axios.post(`${BASEURL}/resetGame`, {});
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
