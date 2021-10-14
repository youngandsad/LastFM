import { useEffect } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCards, likeCard } from './redux/CardList'
import { FaRegHeart } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';


// здесь функицонал лайков, фильтр

function Cards() {

    const cardlist = useSelector((state) => state.cardList.posts[0])
    const dispatch = useDispatch()

    const postStatus = useSelector(state => state.cardList.status)
    const error = useSelector(state => state.cardList.error)

    const likedCards = useSelector((state) => state.cardList.likedCards)

    useEffect(() => {
      if (postStatus === 'idle') {
        dispatch(fetchCards())
      }
    }, [postStatus, dispatch])

    const handleClickLike = (e) => {
      const likeIcon = e.target;
      likeIcon.classList.toggle('checked');   
      const parentBlock = e.target.closest('.card-item')
      // данные с карточки в объект
      const cardId = parentBlock.getAttribute('id')

      const cardsObj = {
        id: parseInt(cardId)
      };
      
      dispatch(likeCard(cardsObj))

    }

    const handleFilterClick = () => {
      // вывод лайкнутых карточек

      const cardBlock = document.querySelector('.cards-block').children;
      for(let el of cardBlock) {
          const cardId = el.getAttribute('id')
          likedCards.map(item => {
            console.log(item.id);
              if(parseInt(cardId) !== item.id) {
                el.classList.add('hide')
              }
          })
      }

    }

    const handleClickDelete = (e) => {
      const likeIcon = e.target;
      likeIcon.classList.toggle('checked')   
             
    }




    if(postStatus === 'loading') {
      return <div>Загрузка...</div>
    } else {
      return(
        <div>
          <div className="filter-btn"><button onMouseDown={handleFilterClick}>Фильтр</button></div>
            <div className="cards-block">
                  {
                    cardlist.recenttracks.track.map((item, index) => (
                      <div key={index} id={index} className="card-item">
                        <div className="like-icon"><FaRegHeart onClick={handleClickLike}/></div>
                        <p><img src={item.image[2]['#text']} alt="" /></p>
                        <h4>Artist: {item.artist['#text']}</h4>
                        <p>Song name: {item.name}</p>
                        <p>Album name: {item.album['#text']}</p>
                        <div className="delete-icon"><FaTrashAlt onClick={handleClickDelete}/></div>
                      </div>
                    ))
                  }

            </div>

        </div>
        )
    }

        }


export default Cards
