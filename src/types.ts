export interface Participant {
  speaker?: string;
  moderator?: string;
  panelists?: string[];
  presenter?: string;
  witness?: string;
  exchange?: string;
  organizations?: string[];
}

export interface Session {
  time: string;
  end_time: string;
  title: string;
  description?: string;
  involved_participants: Participant;
  feature?: string; // This is added when a session is added to the itinerary
}

export interface ScheduleSection {
  date: string;
  feature: string;
  sessions: Session[];
}

export interface ConferenceSchedule {
  conference_schedule: ScheduleSection[];
}