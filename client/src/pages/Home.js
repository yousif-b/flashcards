import AddDeckForm from "../components/AddDeckForm";
import DecksList from "../components/DecksList"
export default function Home(){
    return (
        <div className='page'>
            <AddDeckForm />
            <DecksList />
        </div>
    )
}