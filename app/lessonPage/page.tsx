import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";

export default function LessonPage() {
    return (
        <div>
        <Navbar />
        <Link href="/detailedLessonPage/1">
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Beginner</CardTitle>
                <CardDescription>Foods</CardDescription>
            </CardHeader>
        </Card>
        </Link>
        </div>
    )
}
