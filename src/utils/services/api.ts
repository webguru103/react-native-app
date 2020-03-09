import { AsyncStorage } from 'react-native';
import config from './config';
import Request from '../Request';

const API_ROOT = config.ROOT_URL;

const getDashboard = () => {
	return Request.getAPI(`${API_ROOT}/dashboard`, null)
		.then(response => {
			const result = {
				home: response.data.home,
				ideas: response.data.ideas,
				todos: response.data.todos,
				smartShop: response.data.smartShop,
				error: ''
			};

			return result;
		}).catch(err => {
			return { error: 'Request Failed', home: {}, ideas: [], todos: [], smartShop: {} };
		});
};

const getHomeDetail = (id) => {
	return Request.getAPI(`${API_ROOT}/home/${id}`, null)
		.then(response => {
			const result = {
				home: response.data.home,
				builder: response.data.builder,
				community: response.data.community,
				error: ''
			};

			return result;
		}).catch(err => {
			return { error: 'Request Failed', home: {}, builder: {}, community: {} };
		});
}

const getRooms = (homeId) => {
	return Request.getAPI(`${API_ROOT}/rooms`, { homeId })
		.then(response => {
			const result = {
				rooms: response.data.rooms,
				error: ''
			};

			return result;
		}).catch(err => {
			return { error: 'Request Failed', rooms: [] };
		});
}

const getRoom = (id) => {
	return Request.getAPI(`${API_ROOT}/rooms/${id}`, null)
		.then(response => {
			const result = {
				room: response.data.room,
				roomItem: response.data.item,
				roomItems: response.data.roomItems,
				error: ''
			};

			return result;
		}).catch(err => {
			return { error: 'Request Failed', room: {}, roomItem: {}, roomItems: [] };
		});
}

const getOutdoors = (homeId) => {
	return Request.getAPI(`${API_ROOT}/outdoors`, { homeId })
		.then(response => {
			const result = {
				outdoors: response.data.outdoors,
				error: ''
			};

			return result;
		}).catch(err => {
			return { error: 'Request Failed', outdoors: [] };
		});
}

const getOutdoor = (id) => {
	return Request.getAPI(`${API_ROOT}/outdoors/${id}`, null)
		.then(response => {
			const result = {
				outdoor: response.data.outdoor,
				outdoorItem: response.data.item,
				outdoorItems: response.data.outdoorItems,
				error: ''
			};

			return result;
		}).catch(err => {
			return { error: 'Request Failed', outdoor: {}, outdoorItem: {}, outdoorItems: [] };
		});
}

const getHomeSystems = (homeId) => {
	return Request.getAPI(`${API_ROOT}/systems`, { homeId })
		.then(response => {
			const result = {
				homeSystems: response.data.systems,
				error: ''
			};

			return result;
		}).catch(err => {
			return { error: 'Request Failed', homeSystems: [] };
		});
}

const getHomeSystem = (id) => {
	return Request.getAPI(`${API_ROOT}/systems/${id}`, null)
		.then(response => {
			const result = {
				homeSystem: response.data.system,
				systemItem: response.data.item,
				systemItems: response.data.systemItems,
				error: ''
			};

			return result;
		}).catch(err => {
			return { error: 'Request Failed', homeSystem: {}, systemItem: {}, systemItems: [] };
		});
}

// Item Detail
const getItemDetail = (id) => {
  return Request.getAPI(`${API_ROOT}/item/${id}`, null)
    .then(response => {
      const result = {
        item: response.data.item,
        error: ''
      };

      return result;
    }).catch(err => {
      return { error: 'Request Failed', item: {} };
    });
}

// Paint and Floors
const getPaints = (id) => {
  return Request.getAPI(`${API_ROOT}/paints`, { home: id })
    .then(response => {
      const result = {
        paintItems: response.data.paintItems,
        error: ''
      };

      return result;
    }).catch(err => {
      return { error: 'Request Failed', paintItems: [] };
    });
}

const getFloorTypes = () => {
  return Request.getAPI(`${API_ROOT}/floors-type`, null)
    .then(response => {
      const result = {
        mainCategories: response.data.mainCategories,
        subCategories: response.data.subCategories,
        error: ''
      };

      return result;
    }).catch(err => {
      return { error: 'Request Failed', mainCategories: [], subCategories: [] };
    });
}

const getFloors = (id) => {
  return Request.getAPI(`${API_ROOT}/floors`, { home: id })
    .then(response => {
      const result = {
        floorItems: response.data.floorItems,
        error: ''
      };

      return result;
    }).catch(err => {
      return { error: 'Request Failed', floorItems: [] };
    });
}

export default {
  getDashboard,
  getHomeDetail,
  getRoom,
  getRooms,
  getOutdoors,
  getOutdoor,
  getHomeSystem,
  getHomeSystems,
  getPaints,
  getFloorTypes,
  getFloors,
  getItemDetail,
}
