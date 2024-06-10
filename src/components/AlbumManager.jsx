// src/components/AlbumManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumManager = () => {
    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState('');
    const [editAlbumId, setEditAlbumId] = useState(null);
    const [editAlbumTitle, setEditAlbumTitle] = useState('');

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
            setAlbums(response.data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    const addAlbum = async () => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/albums', {
                title: newAlbum,
            });
            setAlbums([...albums, response.data]);
            setNewAlbum('');
        } catch (error) {
            console.error('Error adding album:', error);
        }
    };

    const updateAlbum = async (id) => {
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, {
                title: editAlbumTitle,
            });
            setAlbums(albums.map(album => (album.id === id ? response.data : album)));
            setEditAlbumId(null);
            setEditAlbumTitle('');
        } catch (error) {
            console.error('Error updating album:', error);
        }
    };

    const deleteAlbum = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
            setAlbums(albums.filter(album => album.id !== id));
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    return (
        <div>
            <h1>Album Manager</h1>
            <div>
                <input
                    type="text"
                    value={newAlbum}
                    onChange={(e) => setNewAlbum(e.target.value)}
                    placeholder="New Album Title"
                />
                <button onClick={addAlbum}>Add Album</button>
            </div>
            <ul>
                {albums.map(album => (
                    <li key={album.id}>
                        {editAlbumId === album.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editAlbumTitle}
                                    onChange={(e) => setEditAlbumTitle(e.target.value)}
                                />
                                <button onClick={() => updateAlbum(album.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                {album.title}
                                <button onClick={() => { setEditAlbumId(album.id); setEditAlbumTitle(album.title); }}>Edit</button>
                                <button onClick={() => deleteAlbum(album.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumManager;
