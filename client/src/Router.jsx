import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import PlayersListView from './views/PlayersListView'
import GameView from './views/GameView'
import LearnView from './views/LearnView'
import TrainView from './views/TrainView'
import AdminOnly from './components/AdminOnly'

export const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<PlayersListView />} />
                <Route path="/upload" element={<PlayersListView />} />
                <Route path="/play" element={<AdminOnly><GameView /></AdminOnly>} />
                <Route path="/learn" element={<LearnView />} />
                <Route path="/train" element={<TrainView />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}