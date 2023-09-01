import Header from "@/components/Header";
import Form from "@/components/Form"
import Postfeed from "@/components/posts/Postfeed";
export default function Home() {
  return (
    <div>
    <Header label="Home"></Header>
    <Form placeholder="What's happening?" ></Form>
    <Postfeed/>
    </div>
  )
}
