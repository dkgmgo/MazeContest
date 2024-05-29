import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import PlayersList from '../components/PlayersList';

const PlayersListView = () => {

    return (
        <div>
            <FileUpload />
            <PlayersList />
        </div>
    );
};

export default PlayersListView;