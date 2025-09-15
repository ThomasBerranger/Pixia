function Admin() {
    return (
        <>
            <div className="w-2/5 border border-purple-500 rounded p-5">
                <p>Discussion avec ChatGPT</p>
                <input type="text" className={'w-full rounded px-1 py-0.5 mt-5'} placeholder={'Question'}/>
                <div className={'bg-white h-20 mt-5 p-1 text-gray-500'}>Blabla réponse</div>
            </div>
        </>
    )
}

export default Admin
