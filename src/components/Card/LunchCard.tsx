import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { db, storage } from "../../main";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

export const LunchCard = () => {

    useEffect(() => {
        const fetchLunchInfo = async () => {
            const querySnapshot = await getDocs(collection(db, "menu"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        };
        fetchLunchInfo();
    }, [])

    return (
        <Card className="mt-6 w-96" placeholder={undefined}>
            <CardHeader color="blue-gray" className="relative h-56" placeholder={undefined}>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/lunchnotification-react.appspot.com/o/gyutan.jpg?alt=media&token=46d13262-25ea-4eb5-a7e7-57c6a8a051a3"
                    alt="card-image"
                />
            </CardHeader>
            <CardBody placeholder={undefined}>
                <Typography variant="h5" color="blue-gray" className="mb-2" placeholder={undefined}>
                    UI/UX Review Check
                </Typography>
                <Typography placeholder={undefined}>
                    The place is close to Barceloneta Beach and bus stop just 2 min by
                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                    night life in Barcelona.
                </Typography>
            </CardBody>
            <CardFooter className="pt-0" placeholder={undefined}>
                <Button placeholder={undefined}>Read More</Button>
            </CardFooter>
        </Card>
    );
}
