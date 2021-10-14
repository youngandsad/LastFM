import { useState, useEffect } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCards } from './redux/CardList'


// здесь функицонал лайков, фильтр

function Cards() {

    const cardlist = useSelector((state) => state.cardList.recenttracks)
    const dispatch = useDispatch()

    const postStatus = useSelector(state => state.cardList.status)
    const error = useSelector(state => state.cardList.error)

    useEffect(() => {
      if (postStatus === 'idle') {
        dispatch(fetchCards())
      }
    }, [postStatus, dispatch])

    console.log(cardlist);

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
