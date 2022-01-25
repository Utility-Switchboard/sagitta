import React, { useState, useEffect } from 'react';
// Styles
import './FormScript.css';
// Icons
import { IconContext } from "react-icons";
import { IoIosChatbubbles } from 'react-icons/io';

function FormScript({ step, use, avgElec, avgGas }) {
    // States
    const [scriptHeight, setHeight] = useState('');

    // useEffect
    useEffect(() => {
        let scHeight = document.getElementById('script-content').offsetHeight;
        setHeight(scHeight);
        let parentElement = document.getElementById('script-container').parentElement;
        parentElement.style.maxHeight = `${scHeight}px`;
    }, [scriptHeight]);

    // Step content
    let step_content;

    // Step 1 - Postcode
    if (step === 1) {
        step_content = (
            <div>
                <ol>
                    <li>Can you confirm your postcode to start with?</li>
                    <li>We save our customers <strong>over £100</strong> per year on <strong>average 41%</strong> of households (10m) are on <strong>Standard Variable Tariff</strong> (the worst tariff available).</li>
                </ol>
            </div>
        )
    }
    // Step 2 - Full address
    if (step === 2) {
        step_content = (
            <div>
                <ol>
                    <li>Can you confirm your door number? <strong>(</strong>Reconfirm full first line of address with customer<strong>)</strong>.</li>
                </ol>
            </div>
        )
    }
    // Step 3 - Choose your fuel type
    if (step === 3) {
        step_content = (
            <div>
                <ol>
                    <li>Do you have both gas and electricity at the property, or only electric?</li>
                </ol>
            </div>
        )
    }
    // Step 4 - Supply number
    if (step === 4) {
        step_content = (
            <div>
                <ol>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</li>

                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiisblanditiis  adipisicing  adipisicing  adipisicing  adipisicing</li>
                </ol>
            </div>
        )
    }
    // Step 5 - Choose your energy supplier(s)
    if (step === 5) {
        step_content = (
            <div>
                <ol>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</li>

                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</li>
                </ol>
            </div>
        )
    }
    // Step 6 - Enter economy 7
    if (step === 6) {
        step_content = (
            <div>
                <ol>
                    <li>Do you have an Economy 7 meter?</li>
                </ol>
            </div>
        )
    }
    // Step 7 - How much energy do you use?
    if (step === 7) {
        step_content = (
            <div>
                <ol>
                    {use === 'kwh' ? <li>Do you know how many KWH of electricity you use each year/month?</li> : null}
                    {use === 'gbp_es' ? <li>Do you know how much you pay each month for your electricity?</li> : null}
                    {use === 'gas' ? <li>Do you know how many KWH of gas you use each year/month?</li> : null}
                    {use === 'gbp_gs' ? <li>Do you know how much you pay each month for your gas?</li> : null}

                    {use === 'avg' ?
                        <li>Okay we will have to base your {(avgElec && !avgGas )? 'electricity' : null} {(avgGas &&  !avgElec) ? 'gas' : null} {(avgElec && avgGas) ? 'electricity and gas' : null} quote on your property profile…</li>
                        :
                        null
                    }
                </ol>
            </div>
        )
    }

    // Step 8 - Existing Debt
    if (step === 8) {
        step_content = (
            <div>
                <p>EXISTING DEBT Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</p>
            </div>
        )
    }

    // Step 9 - Compare section
    if (step === 9) {
        step_content = (
            <div>
                <p>Compare Section Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos ullam quos cupiditate sed tempore? Ducimus blanditiis laborum similique voluptatum sunt ad! Sunt placeat explicabo ratione assumenda voluptate, praesentium tempora!</p>
            </div>
        )
    }

    return (
        <div className="script-container" id="script-container" style={{ maxHeight: scriptHeight }}>
            <div className="script-content" id="script-content">
                <div className="script-header">
                    <h3>My script</h3>
                    <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                        <IoIosChatbubbles />
                    </IconContext.Provider>
                </div>

                {/* Scripts by steps */}
                <>
                    {step_content}
                </>
            </div>
        </div>
    )
}

export default FormScript;
