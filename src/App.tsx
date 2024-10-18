'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, X } from "lucide-react"

interface Participant {
  speaker?: string;
  moderator?: string;
  panelists?: string[];
  presenter?: string;
  witness?: string;
  exchange?: string;
  organizations?: string[];
}

interface Session {
  time: string;
  end_time: string;
  title: string;
  description?: string;
  involved_participants: Participant;
  feature?: string;
}

interface ScheduleSection {
  date: string;
  feature: string;
  sessions: Session[];
}

interface ConferenceSchedule {
  conference_schedule: ScheduleSection[];
}

const conferenceSchedule: ConferenceSchedule = {
  "conference_schedule": [
    {
      "date": "17 October 2024 (Thursday)",
      "feature": "The Future",
      "sessions": [
        {
          "time": "09:00",
          "end_time": "09:45",
          "title": "Keynote",
          "description": "Transforming the Digital Economy: The Role of AI and Big Data",
          "involved_participants": {
            "speaker": "The Honourable Dato Sri Haji Julaihi Bin Haji Narawi"
          }
        },
        {
          "time": "09:50",
          "end_time": "10:30",
          "title": "Panel Discussion",
          "description": "The Impact of AI Across Industries",
          "involved_participants": {
            "moderator": "Tim Miller",
            "panelists": [
              "Richard Goh",
              "Ibrahim Sani",
              "AR Mohd",
              "Dato Haji Syeed Mohd Hussien bin Wan Abd Rahman"
            ]
          }
        },
        {
          "time": "10:30",
          "end_time": "11:00",
          "title": "The Economic and Social Power of Digital Inclusion",
          "involved_participants": {
            "speaker": "John Low Jaei Hong"
          }
        },
        {
          "time": "11:00",
          "end_time": "11:30",
          "title": "Harnessing Big Data and AI: Fundamentals of Implementation",
          "involved_participants": {
            "speaker": "Mohamustaqeem Mohammed"
          }
        },
        {
          "time": "11:30",
          "end_time": "12:00",
          "title": "Sustainable Development Through Green Infrastructure",
          "involved_participants": {
            "speaker": "The Honourable Datuk Haji Ismawi bin Haji Ismuni"
          }
        },
        {
          "time": "14:00",
          "end_time": "16:00",
          "title": "Leaders Forum",
          "description": "Investment Outlook - What, Where & Why",
          "involved_participants": {
            "moderator": "YBhg. Dato' Ir. Ts. Sudarotno Bin Osman",
            "panelists": [
              "Mr Timothy Ong",
              "Prof. Jugdutt (Jack) Singh",
              "Datu Lester Matthew"
            ]
          }
        }
      ]
    },
    {
      "date": "17 October 2024 (Thursday)",
      "feature": "Startup Village",
      "sessions": [
        {
          "time": "09:00",
          "end_time": "10:00",
          "title": "Fireside Chat",
          "description": "Bots & Brushes: How AI is Shaking Up Malaysia's Animation & Gaming Scene!",
          "involved_participants": {
            "moderator": "Amirin Arsya",
            "panelists": [
              "Andrew Bong",
              "Irwan Junaidy",
              "Ryan Lee Chun Hoe"
            ]
          }
        },
        {
          "time": "10:00",
          "end_time": "11:00",
          "title": "Demo Day: Founder's Forge",
          "involved_participants": {
            "presenter": "FutureLab"
          }
        },
        {
          "time": "11:00",
          "end_time": "11:40",
          "title": "Demo Day: Capture the Flag - Cybersecurity Hackathon Demo",
          "involved_participants": {
            "moderator": "Nur Hartini Mardan",
            "panelists": [
              "Dr Sivaraman Eswaran"
            ]
          }
        },
        {
          "time": "11:40",
          "end_time": "12:30",
          "title": "Panel Discussion",
          "description": "Show Me the Money: Different Funds for Different Runs",
          "involved_participants": {
            "moderator": "Vivanita Sarjuni",
            "panelists": [
              "Stanley Siva",
              "Juliana Jan",
              "Xelia Tong"
            ]
          }
        },
        {
          "time": "12:30",
          "end_time": "13:00",
          "title": "Prize Giving Ceremony (Founder's Forge and Capture the Flag) & MOU Exchange",
          "involved_participants": {
            "witness": "YB Dato Sri Roland Sagah",
            "exchange": "Sudarton Osman",
            "organizations": [
              "Vayapath Hanshen",
              "Venture Interactive",
              "Sarawak Influencers Council",
              "Leave a Nest",
              "Dynamik Technologies",
              "Dropee"
            ]
          }
        }
      ]
    }
  ]
}

export default function App() {
  const [itinerary, setItinerary] = useState<Session[]>([])

  const timeSlots = useMemo(() => {
    const slots: string[] = []
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
      }
    }
    return slots
  }, [])

  const addToItinerary = (session: Session, feature: string) => {
    const newSession = { ...session, feature }
    setItinerary([...itinerary, newSession])
  }

  const removeFromItinerary = (session: Session) => {
    setItinerary(itinerary.filter((item) => item.title !== session.title))
  }

  const renderParticipants = (participants: Session['involved_participants']) => {
    return Object.entries(participants).map(([role, value]) => (
      <div key={role} className="mt-1">
        <span className="font-semibold capitalize">{role}: </span>
        {Array.isArray(value) ? value.join(', ') : value}
      </div>
    ))
  }

  const renderSession = (session: Session, feature: string, inItinerary: boolean = false) => (
    <div key={`${session.time}-${session.title}`} className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{session.title}</h3>
          <p className="text-sm text-gray-500">
            <Clock className="inline-block w-4 h-4 mr-1" />
            {session.time} - {session.end_time}
          </p>
          {session.description && (
            <p className="text-sm text-gray-600 mt-1">{session.description}</p>
          )}
          <div className="text-sm text-gray-600 mt-1">
            {renderParticipants(session.involved_participants)}
          </div>
        </div>
        <Button
          onClick={() => inItinerary ? removeFromItinerary(session) : addToItinerary(session, feature)}
          size="sm"
          variant={inItinerary ? "destructive" : "default"}
        >
          {inItinerary ? "Remove" : "Add"}
        </Button>
      </div>
      <Separator className="my-2" />
    </div>
  )

  const isSessionInTimeSlot = (session: Session, slot: string) => {
    const [slotHour, slotMinute] = slot.split(':').map(Number)
    const [sessionStartHour, sessionStartMinute] = session.time.split(':').map(Number)
    const [sessionEndHour, sessionEndMinute] = session.end_time.split(':').map(Number)

    const slotTime = slotHour * 60 + slotMinute
    const sessionStartTime = sessionStartHour * 60 + sessionStartMinute
    const sessionEndTime = sessionEndHour * 60 + sessionEndMinute

    // Check if the slot is within the session time range
    return slotTime >= sessionStartTime && slotTime < sessionEndTime
  }

  const renderTimeline = () => {
    return timeSlots.map((slot, index) => {
      const sessionsInSlot = itinerary.filter(session => isSessionInTimeSlot(session, slot))
      const hasConflict = sessionsInSlot.length > 1

      return (
        <div key={slot} className={`flex ${index % 6 === 0 ? 'border-t border-gray-200' : ''}`}>
          <div className={`flex-grow ${index % 6 === 0 ? '-mt-2' : ''}`}>
            {index % 6 === 0 && (
              <div className="w-20 flex-shrink-0 text-sm font-medium text-gray-500 -mt-2">
                {slot.split(':')[0]}:00
              </div>
            )}
            {sessionsInSlot.length === 0 ? (
              <div className="h-6 border-l border-gray-200"></div>
            ) : (
              sessionsInSlot.map((session, sessionIndex) => {
                const isSessionStart = session.time === slot
                return (
                  <div
                    key={sessionIndex}
                    className={`p-2 rounded-md text-xs ${hasConflict ? 'bg-yellow-100' : 'bg-green-100'
                      } ${isSessionStart ? 'border-t border-l border-r' : 'border-l border-r'}`}
                  >
                    {isSessionStart && (
                      <>
                        <div className="font-semibold text-sm truncate">{session.title}</div>
                        <div className="text-gray-600 truncate">{session.feature}</div>
                        <div className="text-gray-600 truncate">
                          {session.time} - {session.end_time}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 mt-1"
                          onClick={() => removeFromItinerary(session)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Conference Itinerary Planner</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Conference Schedule</CardTitle>
            <CardDescription>Click on a session to add it to your itinerary</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={conferenceSchedule.conference_schedule[0].feature}>
              <TabsList>
                {conferenceSchedule.conference_schedule.map((schedule) => (
                  <TabsTrigger key={schedule.feature} value={schedule.feature}>
                    {schedule.feature}
                  </TabsTrigger>
                ))}
              </TabsList>
              {conferenceSchedule.conference_schedule.map((schedule) => (
                <TabsContent key={schedule.feature} value={schedule.feature}>
                  <ScrollArea className="h-[600px]">
                    <h2 className="text-lg font-semibold mb-2">{schedule.date}</h2>
                    {schedule.sessions.map((session) => renderSession(session, schedule.feature))}
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Itinerary</CardTitle>
            <CardDescription>Your personalized conference timeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-1">
                {renderTimeline()}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}