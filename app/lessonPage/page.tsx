import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";

export default function LessonPage() {
    return (
        <div>
        <Navbar />
        <h2>Beginner Topics</h2>
        <Link href={{ pathname: "/detailedLessonPage/BeginnerFoods"}}>
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>Foods</CardTitle>
                    <CardDescription>Foods</CardDescription>
                </CardHeader>
            </Card>
        </Link>
        <Link href={{ pathname: "/detailedLessonPage/BeginnerConversations"}}>
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>Conversations</CardTitle>
                    <CardDescription>Conversations</CardDescription>
                </CardHeader>
            </Card>
        </Link>
        <Link href={{ pathname: "/detailedLessonPage/BeginnerGrammar"}}>
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>Grammar</CardTitle>
                    <CardDescription>Grammar</CardDescription>
                </CardHeader>
            </Card>
        </Link>
        <h2>Intermediate Topics</h2>
        <Link href={{ pathname: "/detailedLessonPage/IntermediateCulture"}}>
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>Culture</CardTitle>
                    <CardDescription>Culture</CardDescription>
                </CardHeader>
            </Card>
        </Link>
        <Link href={{ pathname: "/detailedLessonPage/IntermediateTravel"}}>
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>Travel</CardTitle>
                    <CardDescription>Travel</CardDescription>
                </CardHeader>
            </Card>
        </Link>
        <Link href={{ pathname: "/detailedLessonPage/IntermediateHealth"}}>
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>Health</CardTitle>
                    <CardDescription>Health</CardDescription>
                </CardHeader>
            </Card>
        </Link>
        </div>
    )
}
