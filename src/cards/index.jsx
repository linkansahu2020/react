import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "_helpers";
import { cardsActions } from "_store";
import Card from "react-credit-cards";

export default function Cards() {
  const { cards } = useSelector((x) => x.cards);
  const dispatch = useDispatch();
  const stackRef = useRef(null);

  useEffect(() => {
    dispatch(cardsActions.getAll());

    const stack = stackRef.current;
    [...stack.children].reverse().forEach((i) => stack.append(i));

    function swap(e) {
      e.stopPropagation();
      let card = stack.querySelector(".card-container:last-child");
      // if (e.target !== card) return;
      card.style.animation = "swap 700ms forwards";

      setTimeout(() => {
        card.style.animation = "";
        stack.prepend(card);
      }, 700);
    }
    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, []);

  return (
    <div>
      <div className="text-center">
        <button
          onClick={() => {
            history.navigate("/cards/new");
          }}
          className="btn btn-secondary"
        >
          Create New Card
        </button>
        <br />
        <br />
        <br />

        <div className="stack-container" ref={stackRef}>
          {cards?.results?.length &&
            cards.results.map((element, index) => {
              return (
                <div key={index} className="card-container">
                  <Card
                    number={element.cardNumber}
                    name={element.cardHolder}
                    expiry={element.cardExpiration}
                    cvc={""}
                  />
                </div>
              );
            })}
        </div>
        <p>Click on the card to see the effect</p>
      </div>
    </div>
  );
}
