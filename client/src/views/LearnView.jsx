import React from 'react';

const LearnView = () => {
    const links = [
        { name: 'Web Dev Tutorials', url: 'https://www.w3schools.com/' },
        { name: 'React doc', url: 'https://react.dev/learn' },
        { name: 'Pathfinding algorithms', url: 'https://en.wikipedia.org/wiki/Pathfinding' },
        { name: 'Maze generation algorithms', url: 'https://en.wikipedia.org/wiki/Maze_generation_algorithm' },
        { name: 'Practice DSA', url: 'https://leetcode.com/problemset/' },
        { name: 'Practice Cybersecurity', url: 'https://www.root-me.org/' }
    ]

    return (
        <div className='p-5'>
            <p>Here are some resources if you want to go further</p>
            <ul>
                {links.map((link, index) => (
                    <li key={index}><a href={link.url}>{link.name}</a></li>
                ))}
            </ul>
        </div>
    );
};

export default LearnView;