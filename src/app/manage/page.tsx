'use client';

import { useEffect, useState } from 'react';
import { fetchRestaurants, editRestaurant, deleteRestaurant } from "@/libs/api";

export default function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [editingRestaurant, setEditingRestaurant] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        tel: "",
        worktime: "",
    });

    useEffect(() => {
        fetchRestaurants()
            .then(data => {
                console.log("Fetched restaurants:", data);
                setRestaurants(data);
            })
            .catch(err => console.error("Failed to fetch restaurants:", err));
    }, []);

    // Open edit mode for a specific restaurant
    const handleEdit = (restaurant: any) => {
        setEditMode(true);
        setEditingRestaurant(restaurant);
        setFormData({
            name: restaurant.name || "",
            address: restaurant.address || "",
            tel: restaurant.tel || "",
            worktime: restaurant.worktime || "",
        });
    };

    // Handle input changes in the edit form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit updated restaurant data to the backend
    const handleSave = async () => {
        if (!editingRestaurant) return;

        try {
            const updatedData = await editRestaurant(editingRestaurant._id, formData);
            console.log("Restaurant updated:", updatedData);

            // Update the restaurants state with the updated restaurant details
            setRestaurants((prevRestaurants) =>
                prevRestaurants.map((restaurant) =>
                    restaurant._id === editingRestaurant._id
                        ? { ...restaurant, ...formData }
                        : restaurant
                )
            );

            setEditMode(false);
            setEditingRestaurant(null);
        } catch (err) {
            console.error("Error saving changes:", err);
        }
    };

    // Handle restaurant deletion
    const handleDelete = async (restaurantId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this restaurant?");
        if (!confirmed) return;

        try {
            await deleteRestaurant(restaurantId);
            console.log(`Restaurant with ID ${restaurantId} deleted.`);

            // Remove the restaurant from the state
            setRestaurants((prevRestaurants) =>
                prevRestaurants.filter((restaurant) => restaurant._id !== restaurantId)
            );
        } catch (err) {
            console.error("Error deleting restaurant:", err);
        }
    };

    return (
        <section className="min-h-screen bg-black !py-8">
            <h1 className="text-3xl font-bold text-white !px-4 !mb-6">Restaurants</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !px-4">
                {restaurants.map((r: any, i: number) => (
                    <div
                        key={r._id}
                        className="bg-white text-black rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105"
                    >
                        <img
                            src={`/res${(i % 4) + 1}.jpg`}
                            alt={r.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="!p-4">
                            <h2 className="text-xl font-bold !mb-2">{r.name}</h2>
                            <p><span className="font-semibold">Address:</span> {r.address}</p>
                            <p><span className="font-semibold">Tel:</span> {r.tel}</p>
                            <p><span className="font-semibold">Worktime:</span> {r.worktime}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="!px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                                    onClick={() => handleEdit(r)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="!px-4 !py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                                    onClick={() => handleDelete(r._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editMode && editingRestaurant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white !p-5 rounded-lg shadow-lg w-96 text-black">
                        <h2 className="text-lg font-medium !mb-3">Edit Restaurant</h2>
                        <form>
                            <div className="!mb-4">
                                <label className="block text-sm font-medium">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full !p-2 border rounded"
                                />
                            </div>
                            <div className="!mb-4">
                                <label className="block text-sm font-medium">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full !p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Tel:</label>
                                <input
                                    type="text"
                                    name="tel"
                                    value={formData.tel}
                                    onChange={handleChange}
                                    className="w-full !p-2 border rounded"
                                />
                            </div>
                            <div className="!mb-4">
                                <label className="block text-sm font-medium">Worktime:</label>
                                <input
                                    type="text"
                                    name="worktime"
                                    value={formData.worktime}
                                    onChange={handleChange}
                                    className="w-full !p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setEditMode(false)}
                                    className="!px-4 !py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="!px-4 !py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
