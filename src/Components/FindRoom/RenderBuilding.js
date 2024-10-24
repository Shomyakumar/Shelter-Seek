
import { useNavigate } from "react-router-dom";

export default function RenderBuildings({loading,buildings,selectedBedType}) {

    const navigate=useNavigate();

    const handleBuildingClick = (buildingId) => {
        navigate(`/rooms/roomDetails/${buildingId}`);
    };

    if (loading) {
      return <p className="text-center font-semibold py-4">Loading...</p>;
    }

    let selectedBuildings = [];
    if (selectedBedType === "single") {
      selectedBuildings = buildings.single;
    } 
    else if (selectedBedType === "double") {
      selectedBuildings = buildings.double;
    } 
    else if (selectedBedType === "both") {
      selectedBuildings = buildings.both;
    }

    if (selectedBuildings.length === 0) {
      return <p className="text-center font-semibold py-4">No buildings available for {selectedBedType} bed type.</p>;
    }

    return selectedBuildings.map((building) => (
        
        <div key={building._id} onClick={() => handleBuildingClick(building._id)}
        className="flex flex-col md:flex-row border border-gray-300 p-6 m-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-indigo-50">
        <img
          src={building.thumbnail}
          alt={building.name}
          className="w-full md:w-1/3 h-64 object-cover rounded-lg mb-4 md:mb-0"
        />
        <div className="ml-0 md:ml-6 flex flex-col justify-between text-left">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">{building.name}</h2>
          <p className="text-lg text-gray-600 mb-2"><span className="font-bold text-gray-800">Address:</span> {building.address}</p>
          <p className="text-lg text-gray-600 mb-2"><span className="font-bold text-gray-800">Price:</span> ₹{building.price.toLocaleString()}</p>
          <p className="text-lg text-gray-600 mb-2"><span className="font-bold text-gray-800">Total Rooms:</span> {building.totalRooms}</p>
          <p className="text-lg text-gray-600 mb-2"><span className="font-bold text-gray-800">Vacant Rooms:</span> {building.vacantRooms}</p>
          <p className="text-lg text-gray-600"><span className="font-bold text-gray-800">Accommodation Type:</span> {building.accommodationType}</p>
        </div>
      </div>
      
    ));
  };
