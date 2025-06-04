import './App.css'

interface AppProps {
    text: string;
}

function App({text = "Hello World"}: AppProps) {

    return (
        <>
            <h1 className="text-3xl font-bold underline text-green-800">
                {text}
            </h1>
        </>
    )
}

export default App;
