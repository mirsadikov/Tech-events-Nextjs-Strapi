import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/Event.module.css";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function EventPage({evt}) {
  const deleteEvent = () => {
    console.log("Delete");
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a><FaPencilAlt/> Edit Events</a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}><FaTimes/> Delete Event</a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600}/>
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue:</h3>
        <p>{evt.address}</p>

        <Link href={"/events"}>
          <a className={styles.back}>{"<"}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps({query: {slug}}) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//
//   console.log(slug);
//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }


export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map(evt => ({
    params: {slug: evt.slug},
  }));

  return {paths, fallback: false};
}

export async function getStaticProps({params: {slug}}) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();

  console.log(slug);
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}


