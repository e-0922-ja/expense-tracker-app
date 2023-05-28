export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Categories: {
        Row: {
          id: number
          name: string | null
          sequence: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sequence?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          sequence?: number | null
        }
      }
      Friendships: {
        Row: {
          friendEmail: string | null
          friendId: string | null
          id: string
          registeredAt: string | null
          statusId: number | null
          updatedAt: string | null
          userId: string | null
        }
        Insert: {
          friendEmail?: string | null
          friendId?: string | null
          id?: string
          registeredAt?: string | null
          statusId?: number | null
          updatedAt?: string | null
          userId?: string | null
        }
        Update: {
          friendEmail?: string | null
          friendId?: string | null
          id?: string
          registeredAt?: string | null
          statusId?: number | null
          updatedAt?: string | null
          userId?: string | null
        }
      }
      Job: {
        Row: {
          created_at: string | null
          friendId: string | null
          id: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string | null
          friendId?: string | null
          id?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string | null
          friendId?: string | null
          id?: string | null
          userId?: string | null
        }
      }
      Status: {
        Row: {
          id: number
          registeredAt: string | null
          statusName: string | null
        }
        Insert: {
          id?: number
          registeredAt?: string | null
          statusName?: string | null
        }
        Update: {
          id?: number
          registeredAt?: string | null
          statusName?: string | null
        }
      }
      Users: {
        Row: {
          email: string | null
          firstName: string | null
          id: string
          lastName: string | null
          password: string | null
          registered_at: string | null
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          firstName?: string | null
          id: string
          lastName?: string | null
          password?: string | null
          registered_at?: string | null
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
          password?: string | null
          registered_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_friendship: {
        Args: {
          user_id: string
          friend_email: string
        }
        Returns: number
      }
      get_friendship: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_friendships: {
        Args: Record<PropertyKey, never>
        Returns: {
          count: number
        }[]
      }
      get_user_friends: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          firstName: string
          lastName: string
          email: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

