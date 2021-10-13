import { useState, useEffect } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadCards } from './redux/CardList'


// здесь функицонал лайков, фильтр



function Cards() {
 
    const cardlist = useSelector((state) => state.cardList.cards[0])
    const dispatch = useDispatch()


    const [lfmData, updateLfmData] = useState(0);
        useEffect(() => {
            fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=slavarock&api_key=96ddca1c0f4f0c36bdfd5b5d60b56cbd&limit=10&format=json`)
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error('error');
              })
              .then(data => dispatch(updateLfmData(data)))
              .catch(() =>
                updateLfmData({ error: 'error' })
              );
          }, []);
    
          const trackArr = lfmData?.recenttracks?.track;
          console.log(trackArr);
          
      return(
            <div>
                <div className="cards-block">
                    <div>
                        
                    </div>
                </div>

            </div>
            )
        }


export default Cards