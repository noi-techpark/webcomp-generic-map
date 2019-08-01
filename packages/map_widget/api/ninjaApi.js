import axios from "axios";
import config from "./config";

export function callGet(domain, path, params) {
	console.log("call = " + domain + path);
	console.log("call params = ");
	console.log(params);
	return axios
		.get(domain + path, {
			params: params
		})
		.then(function(response) {
			console.log("call response = ");
			console.log(response.data);
			console.log(response.config);
			return response.data;
		})
		.catch(function(error) {
			console.log(error.response);
			throw error;
		});
}

export async function fetchStations(type) {
	console.log(type)
	return callGet(config.API_BASE_URL_MOBILITY, "/flat/" + (type || '*'), {
			limit: -1,
			select: "scode,stype,sname,sorigin,scoordinate,smetadata,pcode",
			where: "scoordinate.neq.null,sactive.eq.true",
			distinct: true
		})
		.then(response => {
			this.stations = response.data;
		})
		.catch(e => {
			console.log(e)
			throw e;
		});
	}

export async function fetchActivities() {	
		return callGet(config.API_BASE_URL_TOURISM,"/ODHActivityPoi", {
			pagesize: 12000 //12000
		})
		.then(response => {			
			this.activities = response.Items;
		})
		.catch(e => {
			console.log(e)
			throw e;
		});
}
