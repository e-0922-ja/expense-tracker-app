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
        Relationships: []
      }
      Expenses: {
        Row: {
          categoryId: number | null
          description: string | null
          groupId: string | null
          id: number
          methodId: number | null
          payer: string | null
          payment: number | null
          registeredAt: string | null
          registeredBy: string | null
          settled: boolean | null
          updatedAt: string | null
          updatedBy: string | null
        }
        Insert: {
          categoryId?: number | null
          description?: string | null
          groupId?: string | null
          id?: number
          methodId?: number | null
          payer?: string | null
          payment?: number | null
          registeredAt?: string | null
          registeredBy?: string | null
          settled?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
        Update: {
          categoryId?: number | null
          description?: string | null
          groupId?: string | null
          id?: number
          methodId?: number | null
          payer?: string | null
          payment?: number | null
          registeredAt?: string | null
          registeredBy?: string | null
          settled?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_categoryid_fkey"
            columns: ["categoryId"]
            referencedRelation: "Categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_groupid_fkey"
            columns: ["groupId"]
            referencedRelation: "Groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_payer_fkey"
            columns: ["payer"]
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_registeredby_fkey"
            columns: ["registeredBy"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_updatedby_fkey"
            columns: ["updatedBy"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ExpenseStatus: {
        Row: {
          amount: number | null
          id: number
          paid: boolean | null
          ratio: number | null
          updatedAt: string | null
          updatedBy: string | null
          userId: string | null
        }
        Insert: {
          amount?: number | null
          id?: number
          paid?: boolean | null
          ratio?: number | null
          updatedAt?: string | null
          updatedBy?: string | null
          userId?: string | null
        }
        Update: {
          amount?: number | null
          id?: number
          paid?: boolean | null
          ratio?: number | null
          updatedAt?: string | null
          updatedBy?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expensestatus_updatedby_fkey"
            columns: ["updatedBy"]
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expensestatus_userid_fkey"
            columns: ["userId"]
            referencedRelation: "Users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "friendships_friendid_fkey"
            columns: ["friendId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_statusid_fkey"
            columns: ["statusId"]
            referencedRelation: "Status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_userid_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      GroupMembers: {
        Row: {
          friendshipId: string | null
          groupId: string
        }
        Insert: {
          friendshipId?: string | null
          groupId: string
        }
        Update: {
          friendshipId?: string | null
          groupId?: string
        }
        Relationships: [
          {
            foreignKeyName: "groupmembers_friendshipid_fkey"
            columns: ["friendshipId"]
            referencedRelation: "Friendships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groupmembers_groupid_fkey"
            columns: ["groupId"]
            referencedRelation: "Groups"
            referencedColumns: ["id"]
          }
        ]
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
          id: string
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
        Relationships: [
          {
            foreignKeyName: "groups_registeredby_fkey"
            columns: ["registeredBy"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_updatedby_fkey"
            columns: ["updatedBy"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Methods: {
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
        Relationships: []
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

