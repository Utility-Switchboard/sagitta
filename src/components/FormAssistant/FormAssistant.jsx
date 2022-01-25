import React, {useState, useEffect} from 'react';
// Styles
import './FormAssistant.css';
// Icons
import { IconContext } from "react-icons";
import { BiMessageRoundedError } from 'react-icons/bi';

function FormAssistant({ tips }) {

    // States
    const [assistantHeight, setHeight] = useState('');

    // useEffect
    useEffect(() => {
        let scHeight = document.getElementById('assistant-content').offsetHeight;
        setHeight(scHeight);
        let parentElement = document.getElementById('assistant-container').parentElement;
        parentElement.style.maxHeight = `${scHeight}px`;
    }, [assistantHeight]);

    let tips_content;

    // tips 1 - Full address
    if (tips === 1) {
        tips_content = (
            <div>
                <ul>
                    <li>
                        <p>Reconfirm full first line of address with customer.</p>
                    </li>
                </ul>
            </div>
        )
    }
    // tips 2 - Choose your fuel type
    if (tips === 2) {
        tips_content = (
            <div>
                <ul>
                    <li>
                        <p>Customers who switch both of their fuels to enjoy the most savings</p>
                    </li>
                </ul>
            </div>
        )
    }
    // tips 3 - Supply number
    if (tips === 3) {
        tips_content = (
            <div>
                <ul>
                    <li>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore.</p>
                    </li>

                    <li>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore.</p>
                    </li>
                </ul>
            </div>
        )
    }
    // tips 4 - Choose your energy supplier(s)
    if (tips === 4) {
        tips_content = (
            <div>
                <ul>
                    <li>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore.</p>
                    </li>

                    <li>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore.</p>
                    </li>
                </ul>
            </div>
        )
    }
    // tips 5 - Enter economy 7
    if (tips === 5) {
        tips_content = (
            <div>
                <ul>
                    <li>
                        <p>An Economy 7 meter is a 2 rate meter, so you have a different unit rate in the day and a different unit rate at night.</p>
                    </li>
                </ul>
            </div>
        )
    }
    // tips 6 - How much energy do you use?
    if (tips === 6) {
        tips_content = (
            <div>
                <ul>
                    <li>
                        <p>We need to know how much energy you use so we can provide you with an accurate quote.</p>
                    </li>
                </ul>
            </div>
        )
    }
    // tips 7 - Existing debt
    if (tips === 7) {
        tips_content = (
            <div>
                <ul>
                    <li>
                        <p>Exisitng debt Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore.</p>
                    </li>

                    <li>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore.</p>
                    </li>
                </ul>
            </div>
        )
    }

    // tips 9 - Compare section
    if (tips === 9) {
        tips_content = (
            <div>
                <ul>
                    <li>
                        <p>Compare section Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore.</p>
                    </li>

                    <li>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore.</p>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className="assistant-container" id="assistant-container" style={{maxHeight: assistantHeight}}>
            <div className="assistant-content" id="assistant-content">
                <div className="assistant-header">
                    <h3>Savings Assistant</h3>
                    <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                        <BiMessageRoundedError />
                    </IconContext.Provider>
                </div>

                <div className="assistant-information">
                    <p>Tips for this stage</p>
                    {tips_content}
                </div>
            </div>
        </div>
    )
}

export default FormAssistant;
