import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific logic here, and there shouldn't
 * be any API-aware logic elsewhere in the frontend.
 *
 */

class JoblyApi {
  // The token for interacting with the API will be stored here.
  // Uses environment variable for development purposes.
  static token = import.meta.env.VITE_TOKEN || null;

  /** Generic request method.
   *
   * - endpoint: API endpoint (e.g. 'companies', 'jobs')
   * - data: request body data (for POST, PATCH)
   * - method: HTTP method ('get', 'post', 'patch', 'delete')
   *
   * Returns response data or throws an error.
   */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "API request failed";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    return (await this.request(`companies/${handle}`)).company;
  }

  // Get all companies
  static async getCompanies(queryParams = {}) {
    return (await this.request(`companies`, queryParams)).companies;
  }  

  static async getJobs(queryParams = {}) {
    return (await this.request(`jobs`, queryParams)).jobs;
  }

  static async getToken(data) {
    return (await this.request(`auth/token`, data, "post")).token;
  }
  
  static async register(data) {
    return (await this.request(`auth/register`, data, "post")).token;
  }

  static async getUser(username) {
    return (await this.request(`users/${username}`)).user;
  }  

  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

}

export default JoblyApi;
