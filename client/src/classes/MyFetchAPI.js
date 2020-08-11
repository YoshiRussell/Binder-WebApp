import axios from 'axios';

class MyFetchAPI {
    constructor(apiURL, userID, accessToken) {
        this.apiURL = apiURL;
        this.userID = userID;
        this.accessToken = accessToken;
        this.headerConfig = {
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
    }

    // * This should be called on mount of Profile and cached
    async getUserCoursesFromDB() {
        try {
            const response = await axios.get(`${this.apiURL}/api/user/courses/${this.userID}`, this.headerConfig)
            console.log(response);
            console.log(response.data);
            return response.data;
        } catch(error) {
            console.log("error fetching courses");
            return {};
        }
    }

    // * This should be called on mount of Profile and cached
    async getSpecificCourseDetailsFromDB(courseID) {
        try {
            const response = await axios.get(`${this.apiURL}/api/courses/courseDetail/${courseID}`, this.headerConfig);
            return response.data;
        } catch(error) {
            console.log("error fetching course Details");
            return [];
        }
    }

    // * Called when we create a new Course
    async postNewCourseToDB(courseName) {
        try {
            const requestBody = { courseName };
            const response = await axios.post(`${this.apiURL}/api/user/courses/${this.userID}`, requestBody, this.headerConfig);
            return response.data;
        } catch(error) {
            console.log("failed to post new course");
            return null;
        }
    }

    // * Called when we add a new detail
    postNewDetailToDB(courseID, tabName, newDetailDescription) {
        try {
            const requestBody = { 
                desc: newDetailDescription,
                tabName 
            };
            axios.post(`${this.apiURL}/api/courses/courseDetail/${courseID}`, requestBody, this.headerConfig);
        } catch(error) {
            console.log("failed to post new course detail");
        }
    }
}

export default MyFetchAPI;