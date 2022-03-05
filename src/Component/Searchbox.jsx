import React, { useEffect, useState } from 'react'
import SearchCard from './SearchCard'
import './custom.css'
import axios from 'axios';

export default function Searchbox() {
    const [items, setItems] = useState();
    const [active, setActive] = useState(-1);
    const [keyEvent, setKeyEvent] = useState(false);
    const [mouseEvent, setMouseEvent] = useState(false);
    const [highlight, sethightlight] = useState('');
    const [currView, setCurrview] = useState({ top: 0, bottom: 400 });

    const [styles] = useState({
        container: { width: '30vw', margin: 'auto', padding: '10px' },
        searchbox: { fontFamily: "Arial, FontAwesome", padding: 10, fontSize: 20, width: '100%', height: '40px', outline: '2px solid black' },
        searchContainer: { outline: '2px solid black', maxHeight: '450px', overflow: 'auto', boxShadow: 'rgba(0, 0, 0, 0.75) 0px 5px 15px' },
        noUser: { width: '100%', height: '20vh', outline: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.75) 0px 5px 15px' }
    });

    const scrollToActive = () => {
        const section = active >= 0 && document.getElementById(active);
        const offsettop = section.offsetTop - 50;
        const offsetheight = section.offsetHeight
        if (section && offsettop+offsetheight > currView.bottom) {
            setCurrview({ top: offsettop + offsetheight - 450, bottom: offsettop + offsetheight })
        } else if (section && offsettop <= currView.top) {
            setCurrview({ top: offsettop, bottom: offsettop + 450 })
        }
    }
    const initializeData = () => {
        axios.get(`http://localhost:3001/search?value=${''}`)
        .then(resp => resp.data.results)
        .then(resp => setItems(resp) && setActive(0))
    }

    useEffect(() => {
        initializeData()
    }, [])

    useEffect(() => {
         scrollToActive()
    }, [active])

    const applySearch = (value) => {
        sethightlight(value)
        if (!value || value === '') {
            initializeData()
        } else {
            axios.get(`http://localhost:3001/search?value=${value}`)
            .then(resp => resp.data.results)
            .then(resp => setItems(resp) && setActive(0))
        }

    }

    const handleKeyDown = (e) => {
        if (!mouseEvent && (e.keyCode === 38 || e.keyCode === 40)) {
            setKeyEvent(true);
            if (e.keyCode === 38 && active > 0) {
                setActive(active - 1);
            } else if (e.keyCode === 40 && active < items.length - 1) {
                setActive(active + 1);
            }
        }
    }

    let container = document.getElementById("container")
    if (container)
        container.scrollTop = currView.top
    // console.log(currView)

    return (

        <div
            style={styles.container}
            onChange={(e) => applySearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            onKeyUp={() => {
                // scrollToActive()
                setKeyEvent(false)
            }}
            onMouseMove={()=>setMouseEvent(false)}
        >
            <input
                placeholder="&#xF002; Search"
                type="search"
                style={styles.searchbox}
            />
            {
                items && items.length ?
                    <div id="container" style={styles.searchContainer}>
                        {items.map((item, i) =>
                            <SearchCard
                                id={i}
                                key={i}
                                active={active}
                                setActive={setActive}
                                setMouseMoved={setMouseEvent}
                                data={item}
                                keyPressed={keyEvent}
                                highlight={highlight}
                            ></SearchCard>)}
                    </div> :
                    <div style={styles.noUser}>
                        No User Found
                    </div>
            }
        </div>
    );
}
