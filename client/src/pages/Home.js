import AddDeckForm from "../components/AddDeckForm";
import DecksList from "../components/DecksList"
export default function Home(){
    return (
        <div>
            <h1>Home</h1>
            <AddDeckForm />
            <DecksList />
        </div>
    )
}