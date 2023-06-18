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
      Expenses: {
        Row: {
          category: string | null
          date: string | null
          description: string | null
          groupId: string | null
          id: string
          payer: string | null
          payment: number | null
          registeredAt: string | null
          registeredBy: string | null
          settled: boolean | null
          updatedAt: string | null
          updatedBy: string | null
        }
        Insert: {
          category?: string | null
          date?: string | null
          description?: string | null
          groupId?: string | null
          id?: string
          payer?: string | null
          payment?: number | null
          registeredAt?: string | null
          registeredBy?: string | null
          settled?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
        Update: {
          category?: string | null
          date?: string | null
          description?: string | null
          groupId?: string | null
          id?: string
          payer?: string | null
          payment?: number | null
          registeredAt?: string | null
          registeredBy?: string | null
          settled?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
      }
      ExpenseStatus: {
        Row: {
          amount: number | null
          expenseId: string
          paid: boolean | null
          updatedAt: string | null
          updatedBy: string | null
          userId: string
        }
        Insert: {
          amount?: number | null
          expenseId: string
          paid?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
          userId: string
        }
        Update: {
          amount?: number | null
          expenseId?: string
          paid?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
          userId?: string
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
      GroupMembers: {
        Row: {
          groupId: string
          memberId: string
        }
        Insert: {
          groupId: string
          memberId: string
        }
        Update: {
          groupId?: string
          memberId?: string
        }
      }
      Groups: {
        Row: {
          id: string
          name: string | null
          registeredAt: string | null
          registeredBy: string | null
          updatedAt: string | null
          updatedBy: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          registeredAt?: string | null
          registeredBy?: string | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          registeredAt?: string | null
          registeredBy?: string | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
      }
      Status: {
        Row: {
          id: number
          statusName: string | null
        }
        Insert: {
          id?: number
          statusName?: string | null
        }
        Update: {
          id?: number
          statusName?: string | null
        }
      }
      Users: {
        Row: {
          email: string | null
          firstName: string | null
          id: string
          lastName: string | null
          registeredAt: string | null
          updatedAt: string | null
        }
        Insert: {
          email?: string | null
          firstName?: string | null
          id: string
          lastName?: string | null
          registeredAt?: string | null
          updatedAt?: string | null
        }
        Update: {
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
          registeredAt?: string | null
          updatedAt?: string | null
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
      get_expenses: {
        Args: {
          user_id: string
        }
        Returns: Json[]
      }
      get_total_borrowed_amount: {
        Args: {
          user_id: string
        }
        Returns: {
          payer: string
          totalAmount: number
          firstName: string
          lastName: string
        }[]
      }
      get_total_lent_amount: {
        Args: {
          user_id: string
        }
        Returns: {
          userId: string
          totalAmount: number
          firstName: string
          lastName: string
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
          statusId: number
          sender: boolean
        }[]
      }
      insert_expense: {
        Args: {
          group_name: string
          date: string
          registered_by: string
          member_ids: string[]
          member_paids: boolean[]
          member_amounts: number[]
          payer_id: string
          category: string
          description: string
          payment: number
        }
        Returns: undefined
      }
      update_members_paid: {
        Args: {
          expense_id: string
          checked_members: string
          update_by: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      checked_member_type: {
        user_id: string
        paid: boolean
      }
    }
  }
}

