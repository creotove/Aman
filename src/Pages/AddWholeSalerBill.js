import React, { useState } from 'react';

const AddWholeSalerBill = () => {
    const [items, setItems] = useState([{
        productName: '',
        meter: '',
        perMtrRate: '',
        totalAmount: ''
    }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('submit');
    };

    return (
        <section className='bg-[#0b0b0b] border border-[#1b1b1b] smallContainer radius overflow-auto no-scrollbar md:col-span-7 text-white'>
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center border-b border-[#1b1b1b] pb-2'>
                        <h1 className='text-lg font-semibold'>Add Whole Saler Bill</h1>
                        <button className='myBtn-success'>Save</button>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                        <div>
                            <label htmlFor="wholeSalerName">Whole Saler Name</label>
                            <input type="text" id='wholeSalerName' className='inputBox ms-2' />
                        </div>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input type="date" id='date' className='inputBox ms-2' />
                        </div>
                    </div>
                    <div className='mt-4 '>
                        {items.map((item, index) => (
                            <div key={index} className='grid grid-cols-1 md:grid-cols-5'>
                                <div className='col-span-1 my-1'>
                                    <label htmlFor={`productName-${index}`} className={
                                        index === 0 ? '' : 'md:hidden'
                                    }>Fabric Name</label>
                                    <input
                                        type="text"
                                        id={`productName-${index}`}
                                        placeholder="Fabric name"
                                        className='inputBox text-center'
                                        value={item.productName}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[index].productName = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                                <div className='col-span-1 my-1'>
                                    <label htmlFor={`perMtrRate-${index}`} className={
                                        index === 0 ? '' : 'md:hidden'
                                    }>Rate</label>
                                    <input
                                        type="number"
                                        id={`perMtrRate-${index}`}
                                        placeholder="Per mtr. price"
                                        className='inputBox text-center'
                                        value={item.perMtrRate}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[index].perMtrRate = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                                <div className='col-span-1 my-1'>
                                    <label htmlFor={`meter-${index}`} className={
                                        index === 0 ? '' : 'md:hidden'
                                    }>Quantity</label>
                                    <input
                                        type="number"
                                        id={`meter-${index}`}
                                        placeholder="Total meters"
                                        className='inputBox text-center'
                                        value={item.meter}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[index].meter = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                                <div className='col-span-1 my-1'>
                                    <label htmlFor={`totalAmount-${index}`} className={
                                        index === 0 ? '' : 'md:hidden'
                                    }>Amount</label>
                                    <input
                                        type="number"
                                        id={`totalAmount-${index}`}
                                        placeholder="Total Amount"
                                        className='inputBox text-center'
                                        value={item.totalAmount}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[index].totalAmount = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                                <div className=' flex flex-col md:flex-row col-span-1 my-1 items-end '>
                                    {index !== 0 && (
                                        <button className='myBtn-danger mb-2 md:mb-0 md:mr-2' onClick={() => setItems(items.filter((_, i) => i !== index))}>Remove</button>
                                    )}
                                    {index === items.length - 1 && (
                                        <button className='myBtn-success' onClick={() => setItems([...items, {
                                            productName: '',
                                            meter: '',
                                            perMtrRate: '',
                                            totalAmount: ''
                                        }])}>Add</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddWholeSalerBill;

